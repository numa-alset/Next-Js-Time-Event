
import Head from 'next/head';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-utils';

function HomePage(props) {
   

  return (
    <div>
    <Head>
      <title>NEXT jS eVENTS</title>
      <meta name="description" content='find alot event to evolve'/>
    </Head>
      <EventList items={props.featuredEvents} />
    </div>
  );
}
export async function getStaticProps() {
 const events = await getFeaturedEvents()
  return {
    props:{
      featuredEvents: events
    },
    revalidate:1800
  };
}
export default HomePage;
