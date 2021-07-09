import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import axios from "axios";
import {
  compareFirstNames,
  compareLastNames,
  comparePositions,
  compareDescriptions
} from './utils/compareMembersValues';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

type Members = {
  id: number,
  firstName: string,
  lastName: string,
  position: string,
  description: string
}

const App = () => {

  const [members, setMembers] = useState<Members[]>([]);
  const [displayedMembers, setDisplayedMembers] = useState<Members[]>([])
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [position, setPosition] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [edit, setEdit] = useState<boolean>(false)
  const [add, setAdd] = useState<boolean>(false)

  const getMembers = () => {
    axios
      .get(
        "https://60d1820c5b017400178f3bd5.mockapi.io/api/1/team-members"
      )
      .then((response) => {
        setMembers(response.data);
        setDisplayedMembers(response.data);
      });
  };

  const addMember = (
    firstName?: string,
    lastName?: string,
    position?: string,
    description?: string
  ) => {
    axios
      .post(
        'https://60d1820c5b017400178f3bd5.mockapi.io/api/1/team-members',
        {
          firstName: firstName === "" ? "-" : firstName,
          lastName: lastName === "" ? "-" : lastName,
          position: position === "" ? "-" : position,
          description: description === "" ? "-" : description
        }).then(
          () => {
            getMembers()
            setDisplayedMembers(displayedMembers)
            setFirstName("")
            setLastName("")
            setPosition("")
            setDescription("")
          }
        )
    setAdd(false)
    setEdit(false)
  }

  const updateMember = (
    id: number,
    firstName?: string,
    lastName?: string,
    position?: string,
    description?: string
  ) => {
    axios
      .put(
        `https://60d1820c5b017400178f3bd5.mockapi.io/api/1/team-members/${id}`,
        {
          id: id,
          firstName: firstName === "" ? "-" : firstName,
          lastName: lastName === "" ? "-" : lastName,
          position: position === "" ? "-" : position,
          description: description === "" ? "-" : description
        })
      .then(
        () => {
          getMembers()
        }
      );
    setFirstName("")
    setLastName("")
    setPosition("")
    setDescription("")
    setEdit(false)
  };

  const deleteMember = (id: number) => {
    axios
      .delete(
        `https://60d1820c5b017400178f3bd5.mockapi.io/api/1/team-members/${id}`
      )
      .then(() => {
        setMembers(
          displayedMembers.filter((item) => {
            return item.id !== id;
          })
        );
        getMembers()
      });
  };

  const openAddEditor = () => {
    setAdd(true)
    setEdit(true)
  }

  const editMember = (index: number) => {
    const filteredMembers = displayedMembers
      .filter((_, i) => i === index)
    setDisplayedMembers(filteredMembers)
    filteredMembers.map(item => {
      setFirstName(item.firstName)
      setLastName(item.lastName)
      setPosition(item.position)
      setDescription(item.description)
    })
    setEdit(true)
  }

  const sortMembers = (compare: any) => {
    const sortedMembers = [...displayedMembers]
      .sort(compare)
    setDisplayedMembers(sortedMembers)
  }

  const sortByDefault = () => {
    setDisplayedMembers(members)
  }

  useEffect(() => {
    getMembers()
    setDisplayedMembers(members)
  }, [])

  return (
    <div className={styles.container}>
      {(edit === true && add === false) && <h4>Edit member</h4>}
      {add === false && (
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th># {edit === false && <Button size="sm" className={styles.listBtn} onClick={sortByDefault}>◢</Button>}</th>
              <th>First Name {edit === false && <Button size="sm" className={styles.listBtn} onClick={() => { sortMembers(compareFirstNames) }}>◢</Button>}</th>
              <th>Last Name {edit === false && <Button size="sm" className={styles.listBtn} onClick={() => { sortMembers(compareLastNames) }}>◢</Button>}</th>
              <th>Position {edit === false && <Button size="sm" className={styles.listBtn} onClick={() => { sortMembers(comparePositions) }}>◢</Button>}</th>
              <th>Description {edit === false && <Button size="sm" className={styles.listBtn} onClick={() => { sortMembers(compareDescriptions) }}>◢</Button>}</th>
              <th>{edit === false && <Button size="sm" className={styles.listBtn} onClick={openAddEditor}>+ Add member</Button>}</th>
            </tr>
          </thead>
          <tbody>
            {displayedMembers.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{edit === false ? item.firstName :
                    <input
                      className={styles.listInput}
                      type="text"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value) }}
                    />}
                  </td>
                  <td>{edit === false ? item.lastName :
                    <input
                      className={styles.listInput}
                      type="text"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value) }}
                    />}
                  </td>
                  <td>{edit === false ? item.position :
                    <input
                      className={styles.listInput}
                      type="text"
                      value={position}
                      onChange={(e) => { setPosition(e.target.value) }}
                    />}
                  </td>
                  <td>{edit === false ? item.description :
                    <input
                      className={styles.listInput}
                      type="text"
                      value={description}
                      onChange={(e) => { setDescription(e.target.value) }}
                    />}
                  </td>
                  <td>
                    {edit === false ?
                      <>
                        <Button
                          size="sm"
                          className={styles.listBtn}
                          onClick={() => editMember(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className={styles.listBtn}
                          onClick={() => deleteMember(item.id)}
                        >
                          Delete
                        </Button>
                      </>
                      :
                      <Button
                        size="sm"
                        className={styles.listBtn}
                        onClick={() => updateMember(
                          item.id,
                          firstName,
                          lastName,
                          position,
                          description
                        )}>
                        Save
                      </Button>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
      {add === true && (
        <>
          <h4>Add member</h4>
          <Table striped bordered hover size="sm" variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Position</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    className={styles.listInput}
                    type="text" value={firstName}
                    onChange={(e) => { setFirstName(e.target.value) }}
                  />
                </td>
                <td>
                  <input
                    className={styles.listInput}
                    type="text" value={lastName}
                    onChange={(e) => { setLastName(e.target.value) }}
                  />
                </td>
                <td>
                  <input
                    className={styles.listInput}
                    type="text" value={position}
                    onChange={(e) => { setPosition(e.target.value) }}
                  />
                </td>
                <td>
                  <input
                    className={styles.listInput}
                    type="text" value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                  />
                </td>
                <td>
                  <Button
                    size="sm"
                    className={styles.listBtn}
                    onClick={() => addMember(
                      firstName,
                      lastName,
                      position,
                      description
                    )}>
                    Save
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </div>
  )
}

export default App;
