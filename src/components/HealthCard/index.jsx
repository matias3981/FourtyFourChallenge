import styled, { keyframes} from "styled-components"
import { useEffect, useState, useCallback } from 'react';

const HealthCard = ({ apiName }) => {
  const [apiData, setApiData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const cardRef = useCallback(node => { 
    if (node !== null) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          console.log(entry);
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
          if (!entry.isIntersecting) { 
            setIsVisible(false);
          }
        });
      }, { threshold: 0.20, rootMargin: '10px' });
      observer.observe(node);
    }
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_FOURTYFOUR_API_BASE_URL}/${apiName}/health/status`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        if (!response.ok) {
          if (response.status === 503) {
            setIsLoading(false);
            setApiData({ message: 'This endpoint has been deprecated' })
          }
        }
        const data = await response.json();

        setApiData({
          ...data,
          status: response?.status
        });
        setIsLoading(false);
      } catch (e) {
        console.log(apiName, e);
      }
    }
    const timer = setTimeout(() => fetchData(), 15000);

    // NOTE: we want to fetch the first time the component is mounted. So if there is no data inside apiData, we should fetch it.
    if (!apiData) {
      fetchData()
    }

    return () => clearTimeout(timer);

  }, [apiName, apiData]);

  return isLoading ? <LoaderWraper /> : (
    < Wrapper ref={cardRef} isVisible={isVisible}>
      <Title>{apiName}</Title>
      <Text>Status: {apiData?.status}</Text>
      <Text>{apiData?.hostname}</Text>
      <Text>{apiData?.message}</Text>
      <Text>{apiData?.time && new Date(apiData.time).toLocaleDateString('es-AR')}</Text>
      <Status success={apiData?.success} >{apiData?.success ? 'Success' : 'Failed'}</Status>
    </Wrapper >
  ) 
}

const Wrapper = styled.article`
padding: 32px;
border-radius: 5px;
background-color: white;
box-shadow: 0px 6px 12px 0px hsl(0deg 0% 70%);
text-align: center;
display: flex;
flex-direction: column;
opacity: ${({ isVisible }) => isVisible ? 1 : 0};
transform: translateX(${({ isVisible }) => isVisible ? 0 : '20px'});
transition: 150ms;
`

const Title = styled.p`
font-size: 1.25rem;
text-transform: capitalize;
`

const Text = styled.p`
font-size: 1rem;
color: gray;
line-height: 1.75;
`

const Status = styled.p`
padding: 8px 16px;
background-color: ${props => props.success ? 'hsl(120deg, 45% , 60%)' : 'hsl(0deg, 80%, 60%)'};
margin-top: ${props => !props.success ? 'auto' : '8px'};
`

const loaderBackgroundAnimation = keyframes`
   0% {
      background-color: hsla(0deg, 0%, 75%, 1);;
    }
    100% {
      background-color: hsla(0deg, 0%, 90%, 1);
    }
`

const LoaderWraper = styled.div`
min-height: 254px;
padding: 32px;
border-radius: 5px;
background-color: hsla(0deg, 0%, 75%, 1);
box-shadow: 0px 6px 12px 0px hsl(0deg 0% 70%);
text-align: center;
display: flex;
flex-direction: column;
animation: ${loaderBackgroundAnimation} 1s 0s linear infinite alternate;
`
export default HealthCard;