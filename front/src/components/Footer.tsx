import React from "react";
import { ReactNode } from "react";

class Footer extends React.Component {

  render() {    
  
    

    return (
      <footer className='position-fixed w-100 bottom-0 p-2 cor-logo'>
            
        <div className='container d-flex align-items-center justify-content-between text-center'>
          
          <div className="d-none d-lg-flex align-items-center fw-bold fs-6">
                <span className="text-muted">{new Date().getFullYear()} © Powered by</span>
                <a href="https://github.com/peonia-api" className="text-black-50 text-decoration-none link-primary px-2" target='_blank'>
                    Peônia
                </a>
          </div>   

          <div className='d-flex align-items-center fw-bold fs-6 ms-5 ms-md-0'>

            <a href="https://pt-br.ionic.health/contato" className='text-black-50 text-decoration-none link-primary px-2' target='_blank'>
              Contato
            </a>
          </div>  

        </div>

      </footer>
    );
  }

}

export default Footer;