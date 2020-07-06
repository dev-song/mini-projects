import React from "react";

class Header extends React.Component {
  state = {
    brandName: "Nature",
    brandLogoUrl: "",
    linkInfo: [
      { name: "Home", url: "" },
      { name: "About", url: "" },
      { name: "Contact", url: "" },
    ],
  };

  constructor(props) {
    super(props);
  }

  render() {
    const linkList = this.state.linkInfo.map((link) => (
      <li className='nav-link'>
        <a href={link.url}>{link.name}</a>
      </li>
    ));

    return (
      <header>
        <figure className='brand-info'>
          <img
            className='brand-info__brand-logo'
            src={brandLogoUrl}
            alt='Brand Logo'
          />
          <h1 className='brand-info__brand-name'>{Nature}</h1>
        </figure>
        <ul className='nav-bar'>{linkList}</ul>
      </header>
    );
  }
}

export default Header;
