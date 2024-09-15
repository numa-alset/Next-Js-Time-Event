import { Fragment } from 'react';


import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import { getAllEvents, getEventsById } from '../../helpers/api-utils';

function EventDetailPage (props) {

  const event = props.selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventsById(eventId);
  return{
    props:{
        selectedEvent : event
    },
    revalidate:30
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map(event => ({params : {eventId:event.id}}));
  return{
    paths:paths,
    fallback: false
  };
}



export default EventDetailPage;
