import styled from 'styled-components';
import HealthCard from './components/HealthCard/index.jsx';

const ENDPOINTS_NAMES = [
  "accounts",
  "assets",
  "customers",
  "datapoints",
  "devices",
  "documents",
  "forms",
  "invites",
  "media",
  "messages",
  "namespaces",
  "orders",
  "patients",
  "relationships",
  "rules",
  "templates",
  "users",
  "workflows"
];

function App() {
  return (
    <Wrapper>
      <Title>FourtyFour Challenge</Title>
      <HealthBoard>
        {ENDPOINTS_NAMES.map(apiName => <HealthCard key={apiName} apiName={apiName} />)}
      </HealthBoard>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  height: 100%;
`

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin: 24px 0 32px;
`

const HealthBoard = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 0 24px;
  padding-bottom: 16px;
  place-content: center;
  gap: 16px;
`

export default App
