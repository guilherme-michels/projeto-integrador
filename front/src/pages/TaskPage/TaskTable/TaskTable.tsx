
import React from "react"
import { Task } from '../TaskInterface';
import styled from "styled-components"
import { MdModeEditOutline } from "react-icons/md"
import { AiFillDelete } from "react-icons/ai"

interface TaskTableProps {
    tasks: Array<Task>;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

const TaskBody = styled.div`
padding: 10px;
display: flex;
width: 100%;
`;

const TaskItem = styled.button`
display: flex;
justify-content: center;
border-radius: 8px;
width: 100%;
min-height: 80px;
border: 1px solid #ffcdce;
margin: 20px 0px 0px;
`;

export const TaskTable: React.FunctionComponent<TaskTableProps> = props => {

    return <div>
        {props.tasks.length > 0 ? (
            props.tasks.map(task => (
                <TaskItem style={{ background: "#DF6064" }}>
                    <TaskBody>
                        <div style={{ background: task.color, height: "20px", width: "20px", border: "1px solid #fff" }}></div>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%", }}>
                            <span style={{ marginBottom: "10px" }}>{task.name}</span>
                            <span>Responsável: {task.responsible}</span>
                            <hr
                                style={{
                                    width: "100%",
                                }}
                            />
                            <span style={{ fontSize: "14px", marginTop: "10px" }}>Tarefa: {task.description}</span>
                            <div style={{ display: "flex" }}>
                                <MdModeEditOutline size={20} onClick={() => props.onEdit(task)} />
                                <AiFillDelete size={20} style={{ marginLeft: "8px" }} onClick={() => props.onDelete(task)} />
                            </div>
                        </div>
                    </TaskBody>
                </TaskItem>
            ))
        ) : (
            <tr>
            </tr>
        )}
    </div >
}