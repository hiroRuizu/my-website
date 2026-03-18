from flask import Flask, render_template, redirect, url_for, request, flash
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Subscription

app = Flask(__name__)
app.config['SECRET_KEY'] = 'gymsecretkey123'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gym.db'

db.init_app(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/subscriptions')
def subscriptions():
    return render_template('subscriptions.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = generate_password_hash(request.form['password'])
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('Email already registered.')
            return redirect(url_for('register'))
        new_user = User(name=name, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        new_sub = Subscription(plan='None', status='inactive', user_id=new_user.id)
        db.session.add(new_sub)
        db.session.commit()
        login_user(new_user)
        return redirect(url_for('dashboard'))
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('dashboard'))
        flash('Invalid email or password.')
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    if request.method == 'POST':
        current_user.name = request.form['name']
        db.session.commit()
        flash('Profile updated successfully!')
        return redirect(url_for('profile'))
    return render_template('profile.html')

@app.route('/my-subscription', methods=['GET', 'POST'])
@login_required
def my_subscription():
    if request.method == 'POST':
        plan = request.form['plan']
        current_user.subscription.plan = plan
        current_user.subscription.status = 'active'
        db.session.commit()
        flash('Subscription activated!')
        return redirect(url_for('my_subscription'))
    return render_template('my_subscription.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)