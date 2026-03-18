import os
os.environ['DATABASE_URL'] = 'postgresql://cmg_fitness_db_user:T3dj668SmC0w0yK3tSBOrp5G1SBUcaih@dpg-d6t66n94tr6s73bj7oag-a.singapore-postgres.render.com/cmg_fitness_db'

from app import app, db
from models import User
from werkzeug.security import generate_password_hash

with app.app_context():
    db.create_all()
    admin = User(name='Admin', email='admin@cmgfitness.com', password=generate_password_hash('admin123'), is_admin=True)
    db.session.add(admin)
    db.session.commit()
    print('Admin created!')