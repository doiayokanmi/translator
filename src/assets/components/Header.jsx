import React from 'react'

const Header = () => {
  return (
    <>
        <nav>
            <div id="navBrand">
            <i className="fa-solid fa-language"></i> Translator By Damilola
            </div>

            <div id="navLink">
                <a href=""><i className="fa-solid fa-book"></i> Docs</a>
                <a href=""><i className="fa-solid fa-clipboard-question"></i> About</a>
                <a href=""><i className="fa-solid fa-hand-holding-dollar"></i> Donate</a>
            </div>
        </nav>

    </>
  )
}

export default Header