import React from "react"
import { Container } from 'semantic-ui-react'
import Header from "./Header"

const Layout = props => {
    return(
        <>
            <Header />
                <Container>
                {props.children}
              </Container>
        </>
        
    )

    
}

export default Layout;