import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { Scrollbar } from "react-scrollbars-custom";
import { ModalTask } from "../../components/TaskComponents/ModalTask/ModalTask";

const Column = styled.div`
    width: 25%;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 80vh;
    padding: 20px;
`;

const Title = styled.strong`
margin-bottom: 5%;
`;

const TaskBody = styled.div`
cursor: pointer;
padding: 10px;
display: flex;
width: 100%;
`;

const TaskItem = styled.button`
display: flex;
justify-content: center;
border-radius: 8px;
background: #DF6064;
width: 100%;
min-height: 80px;
cursor: pointer;
border: 1px solid #ffcdce;
margin: 20px 0px 0px;

&:hover {
background: #b34c4f;
}
`;

export function TaskPage() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    return <div>
        <div style={{ display: "flex", marginTop: "20px" }}>
            <Column>
                <Title>Fazer</Title>
                <Scrollbar style={{ width: "100%", height: "100%" }}>
                    <TaskItem onClick={() => setIsModalVisible(true)}>
                        <TaskBody>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", }}>
                                <span style={{ marginBottom: "10px" }}>Ajustar modal de pessoas</span>
                                <hr
                                    style={{
                                        width: "100%",
                                    }}
                                />
                                <span style={{ fontSize: "14px", marginTop: "10px" }}>Ajustar modal de pessoas na tela de cadastro de pessoas</span>
                            </div>
                        </TaskBody>
                    </TaskItem>

                    <TaskItem onClick={() => setIsModalVisible(true)}>
                        <TaskBody>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", }}>
                                <span style={{ marginBottom: "10px" }}>Ajustar modal de pessoas</span>
                                <hr
                                    style={{
                                        width: "100%",
                                    }}
                                />
                                <span style={{ fontSize: "14px", marginTop: "10px" }}>Ajustar modal de pessoas na tela de cadastro de pessoas</span>
                            </div>
                        </TaskBody>
                    </TaskItem>

                    <TaskItem onClick={() => setIsModalVisible(true)}>
                        <TaskBody>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", }}>
                                <span style={{ marginBottom: "10px" }}>Ajustar modal de pessoas</span>
                                <hr
                                    style={{
                                        width: "100%",
                                    }}
                                />
                                <span style={{ fontSize: "14px", marginTop: "10px" }}>Ajustar modal de pessoas na tela de cadastro de pessoas</span>
                            </div>
                        </TaskBody>
                    </TaskItem>

                    <TaskItem onClick={() => setIsModalVisible(true)}>
                        <TaskBody>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", }}>
                                <span style={{ marginBottom: "10px" }}>Ajustar modal de pessoas</span>
                                <hr
                                    style={{
                                        width: "100%",
                                    }}
                                />
                                <span style={{ fontSize: "14px", marginTop: "10px" }}>Ajustar modal de pessoas na tela de cadastro de pessoas</span>
                            </div>
                        </TaskBody>
                    </TaskItem>

                    <TaskItem onClick={() => setIsModalVisible(true)}>
                        <TaskBody>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", }}>
                                <span style={{ marginBottom: "10px" }}>Ajustar modal de pessoas</span>
                                <hr
                                    style={{
                                        width: "100%",
                                    }}
                                />
                                <span style={{ fontSize: "14px", marginTop: "10px" }}>Ajustar modal de pessoas na tela de cadastro de pessoas</span>
                            </div>
                        </TaskBody>
                    </TaskItem>

                    <TaskItem onClick={() => setIsModalVisible(true)}>
                        <TaskBody>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", }}>
                                <span style={{ marginBottom: "10px" }}>Ajustar modal de pessoas</span>
                                <hr
                                    style={{
                                        width: "100%",
                                    }}
                                />
                                <span style={{ fontSize: "14px", marginTop: "10px" }}>Ajustar modal de pessoas na tela de cadastro de pessoas</span>
                            </div>
                        </TaskBody>
                    </TaskItem>

                    <TaskItem onClick={() => setIsModalVisible(true)}>
                        <TaskBody>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", }}>
                                <span style={{ marginBottom: "10px" }}>Ajustar modal de pessoas</span>
                                <hr
                                    style={{
                                        width: "100%",
                                    }}
                                />
                                <span style={{ fontSize: "14px", marginTop: "10px" }}>Ajustar modal de pessoas na tela de cadastro de pessoas</span>
                            </div>
                        </TaskBody>
                    </TaskItem>

                    <TaskItem onClick={() => setIsModalVisible(true)}>
                        <TaskBody>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", }}>
                                <span style={{ marginBottom: "10px" }}>Ajustar modal de pessoas</span>
                                <hr
                                    style={{
                                        width: "100%",
                                    }}
                                />
                                <span style={{ fontSize: "14px", marginTop: "10px" }}>Ajustar modal de pessoas na tela de cadastro de pessoas</span>
                            </div>
                        </TaskBody>
                    </TaskItem>
                </Scrollbar>
                {isModalVisible ? <ModalTask onCloseModal={() => setIsModalVisible(false)} /> : null}
            </Column>
            <Column>
                <Title>Andamento</Title>
                <TaskItem onClick={() => setIsModalVisible(true)}>
                    <TaskBody>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%", }}>
                            <span style={{ marginBottom: "10px" }}>Ajustar modal de pessoas</span>
                            <hr
                                style={{
                                    width: "100%",
                                }}
                            />
                            <span style={{ fontSize: "14px", marginTop: "10px" }}>Ajustar modal de pessoas na tela de cadastro de pessoas</span>
                        </div>
                    </TaskBody>
                </TaskItem>
            </Column>
            <Column>Em revisão</Column>
            <Column>Feito</Column>

        </div >
        <div style={{ display: "flex", flexDirection: "column" }}>
            <hr
                style={{
                    width: "100%",
                    marginBottom: "10px"
                }}
            />
            <Link to="/add-task" style={{ padding: "10px", background: "#DF6064", borderRadius: "8px", width: "175px" }}>Adicionar nova tarefa</Link>
        </div>
    </div >
}