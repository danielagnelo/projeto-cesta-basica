import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}
//importação da API
const baseUrl = 'http://localhost:3001/users'

//iniciação do usuário
const initialState = {
  user: { nome: '', cpf: '', rg: '', nascimento: '', endereco: '', cep: '' },
  list: []
}

export default class UserCrud extends Component {

  state = { ...initialState }

  componentWillMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data })
    })
  }

  clear() {
    this.setState({ user: initialState.user })
  }

  save() {
    const user = this.state.user
    const method = user.id ? 'put' : 'post'
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
    axios[method](url, user)
      .then(resp => {
        const list = this.getUpdatedList(resp.data)
        this.setState({ user: initialState.user, list })
      })
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter(u => u.id !== user.id)
    if (add) {
      list.unshift(user)
    }
    return list
  }

  updateField(event) {
    const user = { ...this.state.user }
    user[event.target.name] = event.target.value
    this.setState({ user })
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" className="form-control"
                name="nome"
                value={this.state.user.nome}
                onChange={e => this.updateField(e)}
                placeholder="Digite o nome do cliente..." />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>CPF</label>
              <input type="text" className="form-control"
                name="cpf"
                value={this.state.user.cpf}
                onChange={e => this.updateField(e)}
                placeholder="Digite o CPF do Cliente..." />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>RG</label>
              <input type="text" className="form-control"
                name="rg"
                value={this.state.user.rg}
                onChange={e => this.updateField(e)}
                placeholder="Digite o RG do Cliente..." />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Data de Nascimento</label>
              <input type="text" className="form-control"
                name="nascimento"
                value={this.state.user.nascimento}
                onChange={e => this.updateField(e)}
                placeholder="Digite a data de Nascimento do Cliente..." />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>CEP</label>
              <input type="text" className="form-control"
                name="cep"
                value={this.state.user.cep}
                onChange={e => this.updateField(e)}
                placeholder="Digite a data de Nascimento do Cliente..." />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Endereço</label>
              <input type="text" className="form-control"
                name="endereco"
                value={this.state.user.endereco}
                onChange={e => this.updateField(e)}
                placeholder="Digite a data de Nascimento do Cliente..." />
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

  load(user) {
    this.setState({ user })
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then(resp => {
      const list = this.getUpdatedList(user, false)
      this.setState({ list })
    })
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>RG</th>
            <th>Data de Nascimento</th>
            <th>CEP</th>
            <th>Endereço</th>
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
    return this.state.list.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.nome}</td>
          <td>{user.cpf}</td>
          <td>{user.rg}</td>
          <td>{user.nascimento}</td>
          <td>{user.cep}</td>
          <td>{user.endereco}</td>
          <td>
            {/* botão para editar */}
            <button className="btn btn-warning"
              onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            {/* botão para deletar */}
            <button className="btn btn-danger ml-2"
              onClick={() => this.remove(user)}>
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
