import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import * as Yup from 'yup';

import { Formik, FormikProps } from 'formik'
import { getSecurityCode } from './constants';
import { RequestSchema, postStudentData } from './api/students.api';


interface IValues {
  rollNumber: string,
  schoolNumber: string,
  admitCardId: string,
  dob: string,
  code: string

}

const initialValue = {
  rollNumber: '',
  schoolNumber: '',
  admitCardId: '',
  dob: '',
  code: ''
}


const validationSchema = Yup.object().shape({
  rollNumber: Yup.string()
    .min(8, 'Please enter at least 8 characters.')
    .required('*Required'),
  schoolNumber: Yup.string()
    .min(5, 'Please enter at least 5 characters.')
    .required('*Required'),
  admitCardId: Yup.string()
    .min(8, 'Please enter at least 8 characters.')
    .required('*Required'),
  dob: Yup.mixed().required('*Required')
});

export const ResultForm = () => {

  const [error , setError ] = React.useState<boolean>(false)
  const [securityCode, setSecurityCode] = React.useState(getSecurityCode())

  const onSubmitHandler = ( values : IValues , resetForm : ({values} : {values : IValues})=>void  )=>{

    const dob : any =  values.dob;
    const timeStamp  = dob?.getTime();

    const requestBody : RequestSchema = {
      rollNumber : values.rollNumber,
      schoolNumber : values.schoolNumber,
      admitCardId : values.admitCardId,
      dob : timeStamp
    }

    postStudentData(requestBody).then(res=>{
      setError(true);
      setSecurityCode(getSecurityCode());
      resetForm({values : {...initialValue}})

    })
    .catch(err=>{
      setError(true);
      resetForm({values : {...initialValue}})
      setSecurityCode(getSecurityCode());
    })
  } 

  const renderForm = (formProps: FormikProps<IValues>) => {
    const { setFieldValue, values, handleReset, handleSubmit, errors, touched, handleBlur, isValid } = formProps
    const onChangeHandler = (field: string, e: React.FormEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value
      setFieldValue(field, value)

    }
    return (
      <div>
        <section className="headertop" style={{ "backgroundColor": "#00CED1" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <img src="https://cbseresults.nic.in/2023/Images/cbseResult.jpg" alt="" className="img-fluid mx-aut float-left logoleft" />
              </div>

              <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 text-right">
                <a target="_blank" className="mt-2 h3 d-block text-white"> https://cbseresults.nic.in</a>
                <span className="d-block h5 text-white">Examination Results 2024</span>
              </div>
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit} {...formProps}>
          <div className="form-horizontal">
            <div className="form-horizontal">
              <section className="searchResultSection">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-10 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-1">
                      <div className="formdivstyle shadow-lg">
                        <div className="col-sm-12 text-center text-dark">
                          <h6 className="font-weight-bold">
                            Secondary School Examination (class X) 2024
                          </h6>
                        </div>
                        <hr />

                        <div className="form-group row">
                          <label className="col-sm-5 col-form-label">
                            <label className="control-label">Your Roll Number :</label>
                          </label>
                          <div className="col-sm-7">
                            <input className="form-control" name='rollNumber' type="string"
                              onChange={(e) => onChangeHandler('rollNumber', e)}
                              placeholder="Roll number"
                              autoComplete="off"
                              value={values.rollNumber}
                              onBlur={handleBlur}
                            />
                            {
                              touched.rollNumber &&
                              <span className="field-validation-valid text-danger">{errors.rollNumber}</span>
                            }
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-5 col-form-label">
                            <label className="control-label" >Your School Number :</label>
                          </label>
                          <div className="col-sm-7">
                            <input className="form-control" name="schoolNumber" placeholder="School Number"
                              onChange={(e) => onChangeHandler('schoolNumber', e)}
                              type="text"
                              autoComplete="off"
                              value={values.schoolNumber}
                              onBlur={handleBlur}
                            />
                            {
                              touched.schoolNumber &&
                              <span className="field-validation-valid text-danger">{errors.schoolNumber}</span>
                            }
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-5 col-form-label">
                            <label className="control-label" >Admit Card Id </label>
                            <small className="text-primary">
                              <strong>  (as given on your admit card)</strong>
                            </small>
                          </label>
                          <div className="col-sm-7">
                            <input className="form-control"
                              onChange={(e) => onChangeHandler('admitCardId', e)}
                              name="admitCardId"
                              autoComplete="off"
                              value={values.admitCardId}
                              placeholder="Admit Card Id" type="text"
                              onBlur={handleBlur}
                            />
                            {
                              touched.admitCardId &&
                              <span className="field-validation-valid text-danger">{errors.admitCardId}</span>
                            }
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-5 col-form-label">
                            <label className="control-label" >Date Of Birth </label>
                            <small className="text-primary">
                              <strong>  (DD/MM/YYYY)</strong>
                            </small>
                          </label>
                          <div className="col-sm-7">
                            <DatePicker
                              dateFormat="dd/MM/yyyy"
                              name={'dob'}
                              placeholderText="Date of birth"
                              minDate={new Date(1104517800000)}
                              maxDate={new Date(1296325800000)}
                              selected={values.dob}
                              showYearDropdown
                              onBlur={handleBlur}
                              onChange={newDate => setFieldValue('dob', newDate)}
                              customInput={<input className="form-control" type="text" name='dob' onBlur={handleBlur} />}
                            />
                            <div>
                              {
                                touched.dob &&
                                <span className="field-validation-valid text-danger">{errors.dob}</span>
                              }
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-5 col-form-label">
                            <label className="control-label" >Enter Security Pin </label>
                            <small className="text-primary">
                              <strong> (case sensitive)</strong>
                            </small>
                          </label>
                          <div className="col-sm-7">
                            <input className="form-control text-box single-line"
                              placeholder="Security Pin"
                              type="text"
                              name='code'
                              onChange={(e) => onChangeHandler('code', e)}
                              autoComplete="off"
                              value={values.code}
                              onBlur={handleBlur}
                            />
                            {
                              touched.code &&
                              <span className="field-validation-valid text-danger">{errors.code}</span>
                            }
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-5 col-form-label">
                            <label className="control-label" >Security Pin :</label>
                          </label>
                          <div className="col-sm-7">
                            <span className='security-code'>{securityCode}</span>
                            <img
                              src="https://cbseresults.nic.in/2023/Images/Refresh.jpg"
                              style={{ "cursor": "pointer" }}
                              className={'reload-security-btn'}
                              onClick={() => setSecurityCode(getSecurityCode())}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                        <div style={{ display : 'flex', justifyContent : 'center', flexDirection: 'column' }}>
                          <div style={{ display : 'flex', justifyContent : 'center' }}>
                            { error && 
                              <>
                                <br></br>
                                <span className="field-validation-valid text-danger">{"Please enter correct rollNo, schoolNo and admitCard Id"}</span>
                              </>
                            }
                          </div>
                        <div style={{ display : 'flex', justifyContent : 'center' }}>
                          <button disabled={!isValid} type="submit" className="btn btn-primary">Submit</button>
                          <button 
                            onClick={(e)=>{ setError(false);
                              handleReset(e);
                              setSecurityCode(getSecurityCode());
                              }} 
                            className="btn btn-danger reset-btn">Reset</button>
                        </div>
                          </div>
                        </div>
                        <hr />
                        <div className="col-sm-12 text-center">
                          <p className="text-center">
                            <strong>Disclaimer : </strong>Neither NIC nor CBSE is responsible for any inadvertent error that may have crept in the results being published on Net. The results published on net are for Immediate information to the examinees. These can not be treated as original mark sheets. Original mark sheets have been issued by the Board separately.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </form>
      </div>
    )
  }


  return (
    <>
      <Formik
        initialValues={{ ...initialValue }}
        validationSchema={validationSchema}
        component={renderForm}
        onSubmit={(values, { resetForm }) => {
          onSubmitHandler(values , resetForm)
        }}

      />
    </>
  )
}