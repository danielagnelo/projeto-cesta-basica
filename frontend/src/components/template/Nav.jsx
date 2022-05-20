import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* Refatorar */}
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/users">
                <i className="fa fa-users"></i> Usuários
            </Link>
            <Link to="/products">
                <i className="fa fa-archive"></i> Produtos
            </Link>
            <Link to="/pending">
                <i className="fa fa-truck"></i> Pedidos Pendentes
            </Link>
            <Link to="/historic">
                <i className="fa fa-calendar-times-o"></i> Histórico de Pedidos
            </Link>
            <Link to="/orders">
                <i className="fa fa-shopping-cart"></i> Fazer Pedido
            </Link>
        </nav>
    </aside>