import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function MenuPage() {
    const data = new Date().toLocaleTimeString('pt-BR', { hour: 'numeric', hour12: false });
    const horario = +data;
    const [mensagem, setMensagem] = useState("");
    const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    const mes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const dia = new Date();

    function saudacao() {
        if (horario >= 0 && horario <= 5) {
            setMensagem("Boa noite!")
        } else if (horario >= 6 && horario < 12) {
            setMensagem("Bom dia!")
        } else if (horario >= 12 && horario < 18) {
            setMensagem("Boa tarde!")
        } else if (horario >= 18 && horario <= 23) {
            setMensagem("Boa noite!")
        }
    }

    useEffect(() => {
        saudacao();
    }, []);

    return (
        <div style={{ width: "100%" }}>
            <div>
                <strong>Página inicial</strong>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: "20px" }}>{semana[dia.getDay()]}, {mes[dia.getMonth()]} de {dia.getDate()}</div>
                    <div style={{ fontSize: "36px" }}>{mensagem}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "50%", height: "200px", background: "#DF6064", padding: "10px", margin: "10px", borderRadius: "8px" }}>
                        Tasker, a sua organização!
                    </div>
                    <div style={{ width: "20%", height: "200px", background: "#DF6064", padding: "10px", margin: "10px", borderRadius: "8px" }}>
                        <strong>Listagens</strong>
                        <hr
                            style={{
                                width: "100%",
                            }}
                        />
                        <div style={{ marginTop: "10px", display: "flex", flexDirection: "column" }}>
                            <Link to="/user">Listagem de pessoas </Link>
                            <Link to="/tasks">Listagem de tarefas </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

