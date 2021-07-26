import React from 'react';
import styles from './AddMember.module.scss';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

type Props = {
    theme: string,
    add: boolean,
    firstName?: string,
    lastName?: string,
    position?: string,
    description?: string,
    addMember: () => void,
    setFirstName: (e: any) => void,
    setLastName: (e: any) => void,
    setPosition: (e: any) => void,
    setDescription: (e: any) => void,
}

const AddMember = ({
    theme, add, firstName, lastName, position, description,
    addMember, setFirstName, setLastName, setPosition,
    setDescription }: Props) => {
    return (
        <>
            {add === true && (
                <>
                    <h4>Add member</h4>
                    <Table striped bordered hover size="sm" variant={theme}>
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
                                        onChange={setFirstName}
                                    />
                                </td>
                                <td>
                                    <input
                                        className={styles.listInput}
                                        type="text" value={lastName}
                                        onChange={setLastName}
                                    />
                                </td>
                                <td>
                                    <input
                                        className={styles.listInput}
                                        type="text" value={position}
                                        onChange={setPosition}
                                    />
                                </td>
                                <td>
                                    <input
                                        className={styles.listInput}
                                        type="text" value={description}
                                        onChange={setDescription}
                                    />
                                </td>
                                <td>
                                    <Button
                                        size="sm"
                                        className={styles.listBtn}
                                        onClick={addMember}>
                                        Save
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </>
            )}
        </>
    )
}

export default AddMember;
