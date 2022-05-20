import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import SearchBar from '../SearchBar/SearchBar'
import Persons from '../../db.json'



const headerProps = {
    icon: 'shopping-cart',
    title: 'Novo Pedido',
    subtitle: 'Cadastrar Novo Pedido de Usuário'
}
const baseUrl = 'http://localhost:3001/orders'
const initialState = {
    order: { nomeProduto: '', valorProduto: '', descricaoProduto: '', quantidadeProduto: '' },
    list: []
}

export default class OrderCrud extends Component {
    /*  state = {
         persons: []
     }
 
     componentDidMount() {
         axios.get(`http://localhost:3001/users`)
             .then(res => {
                 const persons = res.data;
                 this.setState({ persons });
             })
     } */

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ order: initialState.order })
    }

    save() {
        const order = this.state.order
        const method = order.id ? 'put' : 'post'
        const url = order.id ? `${baseUrl}/${order.id}` : baseUrl
        axios[method](url, order)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ order: initialState.order, list })
            })
    }

    getUpdatedList(order, add = true) {
        const list = this.state.list.filter(p => p.id !== order.id)
        if (add) {
            list.unshift(order)
        }
        return list
    }

    updateField(event) {
        const order = { ...this.state.order }
        order[event.target.name] = event.target.value
        this.setState({ order })
    }

    renderForm() {
        return (

            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <SearchBar data={Persons} />
                            <input type="text" className="form-control"
                                name="nomeProduto"
                                value={this.state.order.nomeProduto}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Nome do Cliente..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Produto</label>
                            <input type="text" className="form-control"
                                name="valorProduto"
                                value={this.state.order.valorProduto}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Nome do Produto..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secundary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(order) {
        this.setState({ order })
    }

    remove(order) {
        axios.delete(`${baseUrl}/${order.id}`).then(resp => {
            const list = this.getUpdatedList(order, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome do Cliente</th>
                        <th>Pedido</th>
                        <th>Valor do Pedido</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(order => {
            return (
                <tr key={order.id}>
                    <td>{order.nomeProduto}</td>
                    <td>R${order.valorProduto}</td>
                    <td>{order.descricaoProduto}</td>
                    <td>{order.quantidadeProduto}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(order)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(order)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
