import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Index extends React.Component {
  state = { open: false };
  render() {
    return (
      <Page>
        <TitleBar
          title="Hello world!"
        />
        <Layout>
          <p>does this have an existing endpoint?</p>
        </Layout>
      </Page >
    );
  }
  handleSelection = (resources) => {
    this.setState({ open: false })
    console.log(resources)
  };
}

export default Index;