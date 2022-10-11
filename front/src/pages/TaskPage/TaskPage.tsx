import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { Scrollbar } from "react-scrollbars-custom";
import { ModalTask } from "../../components/TaskComponents/ModalTask/ModalTask";
import { TaskTable } from "./TaskTable/TaskTable";
import { Task } from "./TaskInterface";
import { useToast } from "@chakra-ui/react";
import { deleteTask, getTasks } from "../../api/Task/task.service";
import { SidebarHeaderTeamplate } from "../../templates/SidebarHeaderTeamplate";

const Column = styled.div`
    width: 30%;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 80vh;
    padding: 20px;
`;

const Title = styled.strong`
margin-bottom: 5%;
`;


export function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>([])
    const navigate = useNavigate()
    const toast = useToast()

    const fetchTasks = () => {
        getTasks().then(data => setTasks(data.taskList))
    }

    useEffect(() => {
        fetchTasks();
    }, [])

    const onEditTask = (task: Task) => {
        navigate(`/tasker/editar-task/${task.id}`)
    }

    const onDeleteTask = async (task: Task) => {
        try {
            await deleteTask(task)
            toast({
                position: 'top-right',
                description: "Tarefa deletada com sucesso!",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            fetchTasks()
        } catch (err) {
            toast({
                position: 'top-right',
                description: 'Falha em excluir usuário!',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <SidebarHeaderTeamplate>
            <div>
                <div style={{ display: "flex", marginTop: "20px" }}>
                    <Column>
                        <Title>Tarefas</Title>
                        <Scrollbar style={{ width: "100%", height: "100%" }}>
                            <TaskTable onDelete={onDeleteTask} onEdit={onEditTask} tasks={tasks} />
                        </Scrollbar>
                        {isModalVisible ? <ModalTask onCloseModal={() => setIsModalVisible(false)} /> : null}
                    </Column>
                    {/* <Column>
                        <Title>Andamento</Title>
                        <Scrollbar style={{ width: "100%", height: "100%" }}>

                        </Scrollbar>
                    </Column>
                    <Column>
                        <Title>Em revisão</Title>
                        <Scrollbar style={{ width: "100%", height: "100%" }}>

                        </Scrollbar>
                    </Column>
                    <Column>
                        <Title>Feito</Title>
                        <Scrollbar style={{ width: "100%", height: "100%" }}>
                        </Scrollbar>
                    </Column> */}

                </div >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <hr
                        style={{
                            width: "100%",
                            marginBottom: "10px"
                        }}
                    />
                    <Link to="/tasker/add-task" style={{ padding: "10px", background: "#DF6064", borderRadius: "8px", width: "172px" }}>Adicionar nova tarefa</Link>
                </div>
            </div >
        </SidebarHeaderTeamplate>
    )
}