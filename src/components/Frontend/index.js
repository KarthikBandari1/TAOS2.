import {Component} from 'react'
import './index.css'

class RegisterForm extends Component {
  state = {
    orderNo: '',
    name: '',
    isFormSubmitted: false,
  }

  toUnsubmit = () => {
    this.setState({isFormSubmitted: false})
  }

  handleInputChange = e => {
    this.setState({isFormSubmitted: false})
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  handleSubmit = async e => {
    e.preventDefault()
    const {orderNo, name} = this.state
    document.getElementById('hi').value = ''
    this.setState({isFormSubmitted: true, orderNo: '', name: ''})
    const bodyData = {orderNo, name}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    }

    console.log(options)

    try {
      const response = await fetch('http://localhost:3003/', options)
      if (response.status === 200) {
        console.log('success')
      } else {
        console.log('Request was not successful. Status: ', response.status)
      }
    } catch (error) {
      console.error('Network error:', error)
    }
  }

  render() {
    const {orderNo, name, isFormSubmitted} = this.state
    return (
      <div className="container register">
        <div className="row">
          <div className="col-md-12">
            <div
              className="tab-pane fade show active text-align form-new"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="row register-form">
                <div className="col-md-12">
                  {isFormSubmitted && (
                    <p className="text-center h3 mb-4 font-weight-bold">
                      Thanks for Submitting.
                    </p>
                  )}
                  <form
                    method="post"
                    name="google-sheet"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="form-group">
                      <input
                        type="date"
                        name="date"
                        id="hi"
                        className="form-control"
                        placeholder="Date"
                        onClick={this.toUnsubmit}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="number"
                        name="orderNo"
                        className="form-control"
                        placeholder="Order Number*"
                        value={orderNo}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name*"
                        value={name}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="submit"
                        name="submit"
                        className="btnSubmit btn-block"
                        value="Submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterForm
