import React, { useEffect, useState } from 'react';
import { Table, Card, Button } from 'react-bootstrap';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams data:', data);
        setTeams(data.results || data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  return (
    <Card className="mb-4">
      <Card.Header as="h2">Teams</Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                <td>{team.id || idx + 1}</td>
                <td>{team.name || 'N/A'}</td>
                <td>{team.members ? team.members.join(', ') : JSON.stringify(team)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary">Add Team</Button>
      </Card.Body>
    </Card>
  );
};

export default Teams;
