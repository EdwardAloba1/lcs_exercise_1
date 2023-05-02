import * as React from 'react'
import styled from 'styled-components'
import Logo from './assets/Clerk_of_the_U.S._House_of_Representatives_logo.svg.png'


const NavbarScroller = (props: {
    brand: { name: string; to: string },
    links: Array<{ name: string, to: string }>
  }) => {
    const { brand, links } = props;
    const NavLinks: any = () => links.map((link: { name: string, to: string }) => <Li key={link.name}><a href={link.to}>{link.name}</a></Li>);
    return (
      <Navbar>
        <Brand href={brand.to} ></Brand>
        <img src={Logo} width="1280" height="162" ></img>
        
      </Navbar >
    )
  };

  const Theme = {
    colors: {
      bg: `#fff`,
      dark: `#24292e`,
      light: `#EEEEEE`,
      red: `#ff5851`,
    },
    fonts: {
      body: `IBM Plex Sans, sans-serif`,
      heading: `IBM Plex Sans, sans-serif`,
    }
  }
  
  const Navbar = styled.nav`
    background: ${Theme.colors.light};
    font-family: ${Theme.fonts.heading};
    color: ${Theme.colors.light};
    
    align-items: right;
    justify-content: space-between;
    a { color: black; text-decoration: none; }`;
  
  const Brand = styled.a`
    font-weight: bold;
    font-style: italic;
    margin-left: 1rem;
    padding-right: 1rem;`;
  
  const Ul = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
    align-items: left;
    /* overflow-x: hidden; */
    -webkit-overflow-scrolling: touch;`;
  
  const Li = styled.li`
    flex: 0 0 auto;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    -webkit-tap-highlight-color: transparent;
    align-items: center;
    color: #999;
    height: 100%;
    justify-content: center;
    text-decoration: none;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    -webkit-tap-highlight-color: transparent;
    align-items: center;
    color: #999;
    display: flex;
    font-size: 14px;
    height: 50px;
    justify-content: center;
    line-height: 16px;
    margin: 0 1.125rem ;
    text-decoration: none;
    white-space: nowrap;`;
    

    
  
  export default NavbarScroller;