import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import axios from "axios";
import {
  compareFirstNames,
  compareLastNames,
  comparePositions,
  compareDescriptions
} from './utils/compareMembersValues';
import AddMember from './components/AddMember/AddMember';
import MembersList from './components/MembersList/MembersList';

export type Members = {
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
      <MembersList
        edit={edit}
        add={add}
        sortByDefault={sortByDefault}
        sortFirstNames={() => { sortMembers(compareFirstNames) }}
        sortLastNames={() => { sortMembers(compareLastNames) }}
        sortPositions={() => { sortMembers(comparePositions) }}
        sortDescriptions={() => { sortMembers(compareDescriptions) }}
        openAddEditor={openAddEditor}
        displayedMembers={displayedMembers}
        firstName={firstName}
        lastName={lastName}
        position={position}
        description={description}
        setFirstName={(e) => { setFirstName(e.target.value) }}
        setLastName={(e) => { setLastName(e.target.value) }}
        setPosition={(e) => { setPosition(e.target.value) }}
        setDescription={(e) => { setDescription(e.target.value) }}
        editMember={editMember}
        deleteMember={deleteMember}
        updateMember={updateMember}
      />
      <AddMember
        add={add}
        firstName={firstName}
        lastName={lastName}
        position={position}
        description={description}
        addMember={() => addMember(
          firstName,
          lastName,
          position,
          description
        )}
        setFirstName={(e: any) => { setFirstName(e.target.value) }}
        setLastName={(e: any) => { setLastName(e.target.value) }}
        setPosition={(e: any) => { setPosition(e.target.value) }}
        setDescription={(e: any) => { setDescription(e.target.value) }}
      />
    </div>
  )
}

export default App;
