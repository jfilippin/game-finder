import React, { useState } from "react";
import Axios from 'axios';
import $ from 'jquery';
import { 
    Form,
    Table,
    InputGroup,
    Button,
    FloatingLabel
} from 'react-bootstrap';

function Main() {
    const [nomeJogo, setNomeJogo] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                nomeJogo
            }
        };
        
        Axios.get(`https://4mjzif86pi.execute-api.us-east-1.amazonaws.com/inicial/buscajogos?jogo=${nomeJogo.toLowerCase()}`, options)
        .then((res) => {
            return res;
        })
        .then((res) => {
            $("#gamelist").find("tr").remove();

            for(var j = 0; j < res.data.length; j++) {
                $("#gamelist").append(`
                    <tr id=${res.data[j].id}>
                        <td rowSpan=2><img class="imagem" src="${res.data[j].urlimagem}"/></td>
                        <td class=tdSmall>
                            <strong>Nome do jogo:</strong><br/>
                                ${res.data[j].nome}
                        </td>
                    </tr>

                    <tr>
                        <td colSpan=3 class=tdSmall>
                            <strong>Descrição do jogo:</strong><br/>
                                ${res.data[j].descricao}
                        </td>
                    </tr>
                `);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <div className="main">
            <h1 className="title">Bem vindo</h1>

            <Form method="GET">
                <InputGroup>
                    <FloatingLabel label="Insira o nome do jogo">
                        <Form.Control placeholder="Insira o nome do jogo" type="text" onChange={(e) => setNomeJogo(e.target.value.split(' ').join('_'))}/><br/>
                    </FloatingLabel>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Buscar</Button>
                </InputGroup>
            </Form>
            <br/><br/>

            <div className="jogo">
                <Table striped bordered hover size="sm" responsive>
                    <tr>
                        <th colSpan="3">Jogos encontrados</th>
                    </tr>

                    <tbody id="gamelist"/>
                </Table>
            </div>
        </div>
    )

} export default Main