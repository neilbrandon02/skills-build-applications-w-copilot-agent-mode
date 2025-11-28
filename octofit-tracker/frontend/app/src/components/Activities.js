import React, { useEffect, useState } from 'react';
import { Table, Card, Button } from 'react-bootstrap';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities data:', data);
        setActivities(data.results || data);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <Card className="mb-4">
      <Card.Header as="h2">Activities</Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                <td>{activity.id || idx + 1}</td>
                <td>{activity.name || 'N/A'}</td>
                <td>{activity.details || JSON.stringify(activity)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary">Add Activity</Button>
      </Card.Body>
    </Card>
  );
};

export default Activities;
