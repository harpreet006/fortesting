import React from 'react';
import '../../style/formStyle.css'

const AccountForm = () => {
    return (
        <div class="main">
            <div class="container">
                <div class="signup-content">
                 
                    <div class="signup-form">
                        <form method="POST" class="register-form" id="register-form">
                            <h2>My Accounts</h2>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="name">Name :</label>
                                    <input type="text" name="name" id="name" required />
                                </div>
                                <div class="form-group">
                                    <label for="father_name">Pan No. :</label>
                                    <input type="text" name="father_name" id="father_name" required />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address">Aadhaar No. :</label>
                                <input type="text" name="address" id="address" required />
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="email">Personal Email ID :</label>
                                    <input type="email" name="email" id="email" />
                                </div>

                                <div class="form-group">
                                    <label for="email">Office Email ID :</label>
                                    <input type="email" name="email" id="email" />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="pincode">PERSONAL CONTACT NO :</label>
                                    <input type="text" name="pincode" id="pincode" />
                                </div>

                                <div class="form-group">
                                    <label for="pincode">OFFICIAL CONTACT NO :</label>
                                    <input type="text" name="pincode" id="pincode" />
                                </div>
                            </div>

                            <div class="form-submit">
                                <button type="button" class="submit">Change Password</button>
                                <input type="submit" value="Submit Form" class="submit" name="submit" id="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default AccountForm
