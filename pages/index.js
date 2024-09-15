import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-utils';

function HomePage(props) {
   

  return (
    <div>
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
