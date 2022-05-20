import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'archive',
    title: 'Produtos',
    subtitle: 'Cadastro de Produtos: Incluir, Listar, Alterar e Excluir!'
}
const baseUrl = 'http://localhost:3001/products'
const initialState = {
    product: { nomeProduto: '', valorProduto: '', descricaoProduto: '', quantidadeProduto: '' },
    list: []
}

export default class ProductCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ product: initialState.product })
    }

    save() {
        const product = this.state.product
        const method = product.id ? 'put' : 'post'
        const url = product.id ? `${baseUrl}/${product.id}` : baseUrl
        axios[method](url, product)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ product: initialState.product, list })
            })
    }

    getUpdatedList(product, add = true) {
        const list = this.state.list.filter(p => p.id !== product.id)
        if (add) {
            list.unshift(product)
        }
        return list
    }

    updateField(event) {
        const product = { ...this.state.product }
        product[event.target.name] = event.target.value
        this.setState({ product })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome do Produto</label>
                            <input type="text" className="form-control"
                                name="nomeProduto"
                                value={this.state.product.nomeProduto}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do Produto que Deseja Cadastrar..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Valor</label>
                            <input type="number" className="form-control"
                                name="valorProduto"
                                value={this.state.product.valorProduto}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Valor do Produto que Deseja Cadastrar..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" className="form-control"
                                name="descricaoProduto"
                                value={this.state.product.descricaoProduto}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a Descrição do Produto que Deseja Cadastrar..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input type="number" className="form-control"
                                name="quantidadeProduto"
                                value={this.state.product.quantidadeProduto}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a Quantidade de Produtos em Estoque..." />
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

    load(product) {
        this.setState({ product })
    }

    remove(product) {
        axios.delete(`${baseUrl}/${product.id}`).then(resp => {
            const list = this.getUpdatedList(product, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Valor</th>
                        <th>Descrição</th>
                        <th>Quantidade</th>
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
        return this.state.list.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.nomeProduto}</td>
                    <td>R${product.valorProduto}</td>
                    <td>{product.descricaoProduto}</td>
                    <td>{product.quantidadeProduto}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(product)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(product)}>
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
