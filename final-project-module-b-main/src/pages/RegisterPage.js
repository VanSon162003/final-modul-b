function RegisterPage() {
    return `
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header text-center">
                            <h2>Register</h2>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="mb-3">
                                    <label for="name" class="form-label">Full Name</label>
                                    <input type="text" class="form-control" id="name" placeholder="Enter your full name">
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="email" placeholder="Enter your email">
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password" placeholder="Enter your password">
                                </div>
                                <div class="d-grid">
    <button type="submit" class="btn btn-primary">Register</button>
</div>

<div class="text-center mt-3">
    <a href="/login" class="btn btn-outline-primary">Login</a>
</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export default RegisterPage;
