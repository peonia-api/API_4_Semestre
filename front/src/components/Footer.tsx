import React from "react";
import { ReactNode } from "react";

class Footer extends React.Component {

  render() {    
  
    

    return (
      <footer className='w-100 bottom-0 p-2 cor-logo background-footer footer d-flex'>
            
        <div className='container d-flex align-items-center justify-content-between text-center'>
          <img 
            src="https://uploads-ssl.webflow.com/60dcc4691817e11aa93685ab/636cfd9cb8612167da0aef9d_brand-dark-color.svg" 
            alt="Logotipo de IONIC Health" 
            width="200"
            />
          <div className="d-none d-lg-flex align-items-center fw-bold fs-6 rights">
                <span className="text-muted">{new Date().getFullYear()} © Powered by</span>
                <a href="https://fatecsjc-prd.azurewebsites.net/" className="text-black-50 text-decoration-none link-primary px-2" target='_blank'>
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