import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Checkbox } from '@progress/kendo-react-inputs';
import { Link } from 'react-router-dom';

export const SignUp = () => {
   return (
      <div className="App">
      <div className="sign-in-page">
 <div className="sign-in-wrapper">
     <div className="logo-wrapper">
         <div className="logo">
         <img src={require('../assets/signin.png')} alt={'sign in icon'} /> :
         </div>
         <div className='banner'>
             Sign In
         </div>
         <div className="account">
         Already have an account?  <Link to="/">Sign In</Link>
         </div>
     </div>
     <div className="inputs-wrapper">
     <Form  render={formRenderProps => <FormElement style={{
maxWidth: 650
}}>
   <fieldset className={'k-form-fieldset'}> 
   <div className="mb-3">
              <Field
                name={"fullName"}
                component={Input}
                label={"Full Name"}
              />
            </div>        
       <div className="mb-3">
         <Field name={"email"} type={"email"} component={Input} label={"Email"} />
       </div>
       <div className="mb-3">
         <Field name={"password"} type={"password"} component={Input} label={"Password"} />
         <div className="mb-3">
              <Field
                name={"Company"}
                component={Input}
                label={"Company"}
              />
            </div> 
       </div>
       
     </fieldset>
   
     <fieldset className={'k-form-fieldset'}>         
     <div className="mb-3">
     <Checkbox label={'I agree to the Terms of Services and Privacy Policy'} />
       </div>
       <div className="k-form-buttons">
       <button type={'submit'} className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
        Create Free Account 
       </button>
     </div>
       </fieldset>


   </FormElement>} />
         
     </div>

 </div>
 <div className="frame-wrapper">
     <div className="text-wrapper">
     <h2>How Does Kendo UI Cut Development Time?</h2>
     <h4>Kendo UI delivers everything you need to build modern, beautiful, responsive apps.</h4>
         <div className="second-image-wrapper">
             <img src={require('../assets/ninja-with-sword.png')} alt={'ninja with a sword'} className="ninja-with-sword"/>
         </div>
         
         </div>
 </div>
</div>
 </div>
   )
}