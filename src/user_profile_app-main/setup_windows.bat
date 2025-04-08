@echo off
echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing requirements...
pip install -r requirements.txt

echo Setting up environment variables...
echo SECRET_KEY=your_secret_key_here > .env
echo DATABASE_URL=mysql://root:password@localhost/user_profiles >> .env

echo Setup complete! 
echo Please update the .env file with your MySQL password
echo Then run: python init_db.py
echo Finally run: python app.py
