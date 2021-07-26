import React from 'react';
import styles from './MembersList.module.scss';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import { Members } from '../../App';

type Props = {
    theme: string,
    edit: boolean,
    add: boolean,
    sortByDefault: () => void,
    sortFirstNames: () => void,
    sortLastNames: () => void,
    sortPositions: () => void,
    sortDescriptions: () => void,
    openAddEditor: () => void,
    displayedMembers: Members[],
    firstName?: string,
    lastName?: string,
    position?: string,
    description?: string,
    setFirstName: (e: any) => void,
    setLastName: (e: any) => void,
    setPosition: (e: any) => void,
    setDescription: (e: any) => void,
    editMember: (index: number) => void,
    deleteMember: (id: number) => void,
    updateMember: (id: number,
        firstName?: string,
        lastName?: string,
        position?: string,
        description?: string) => void,
}

const MembersList = ({ theme, edit, add, sortByDefault, sortFirstNames,
    sortLastNames, sortPositions, sortDescriptions, openAddEditor,
    displayedMembers, firstName, lastName, position, description,
    setFirstName, setLastName, setPosition, setDescription,
    editMember, deleteMember, updateMember }: Props) => {
    return (
        <>
            {(edit === true && add === false) && <h4>Edit member</h4>}
            {add === false && (
                <Table striped bordered hover size="sm" variant={theme}>
                    <thead>
                        <tr>
                            <th># {edit === false && <Button size="sm" className={styles.listBtn} onClick={sortByDefault}>◢</Button>}</th>
                            <th>First Name {edit === false && <Button size="sm" className={styles.listBtn} onClick={sortFirstNames}>◢</Button>}</th>
                            <th>Last Name {edit === false && <Button size="sm" className={styles.listBtn} onClick={sortLastNames}>◢</Button>}</th>
                            <th>Position {edit === false && <Button size="sm" className={styles.listBtn} onClick={sortPositions}>◢</Button>}</th>
                            <th>Description {edit === false && <Button size="sm" className={styles.listBtn} onClick={sortDescriptions}>◢</Button>}</th>
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
                                            onChange={setFirstName}
                                        />}
                                    </td>
                                    <td>{edit === false ? item.lastName :
                                        <input
                                            className={styles.listInput}
                                            type="text"
                                            value={lastName}
                                            onChange={setLastName}
                                        />}
                                    </td>
                                    <td>{edit === false ? item.position :
                                        <input
                                            className={styles.listInput}
                                            type="text"
                                            value={position}
                                            onChange={setPosition}
                                        />}
                                    </td>
                                    <td>{edit === false ? item.description :
                                        <input
                                            className={styles.listInput}
                                            type="text"
                                            value={description}
                                            onChange={setDescription}
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
        </>
    )
}

export default MembersList;
