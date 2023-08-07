# Friendo - Connecting Dogs, Connecting People, & Unleashing the Power of Socialization

# Description
In a world where remote work has become the norm, our furry friends have also felt the distance. 
Isolated dogs not only pose challenges within the confines of our homes but can also exhibit aggression 
when exposed to the outside world. Enter Friendo, a revolutionary solution designed to pair your canine 
companions with their perfect playmates, ensuring a happier and more socialized life for your pets.

# Getting Started
Follow these steps to set up and run Friendo on your system:

1. Install Dependencies: Run the following command to install the required dependencies:

bundle install

2. Start PostgreSQL: Ensure that PostgreSQL is up and running before launching the Rails server. 
Use the following command to start PostgreSQL (if not already started):

sudo service postgresql start

Note: If PostgreSQL is not installed, you can refer to the installation instructions provided below.

3. Run Migrations: Execute the following commands to run database migrations and start the Rails server:

rails db:migrate
rails s

4. Install Frontend Packages: To install frontend packages, use the following command:

npm install --prefix client

5. Start Frontend Client: Launch the frontend client using the following command:

npm start --prefix client

# Usage

## Friendo offers a range of features to enhance the lives of you and your dog:

## Home: 
Provides a concise overview of the application's purpose and features.

## Dogs: 
Displays a comprehensive list of dogs in the database, excluding your own. Invite other dogs to meet up with your furry companion.

## Create Meetup: 
Fill out a form to propose a meetup, including location, date, time, and your dog's information.

## Locations: 
Explore a collection of added meetup locations. Users can contribute and edit locations, expanding the range of possibilities for dog meetups.

## Add Dog: 
Seamlessly add your dog's details to the database.

## Profile: 
Update your personal information, your dog's information, and upload or replace your dog's photo.

#### PostgreSQL Installation for WSL

To install Postgres for WSL, run the following commands from your Ubuntu terminal:

```sh
sudo apt update
sudo apt install postgresql postgresql-contrib libpq-dev
```

Then confirm that Postgres was installed successfully:

```sh
psql --version
```

Run this command to start the Postgres service:

```sh
sudo service postgresql start
```

Finally, you'll also need to create a database user so that you are able to
connect to the database from Rails. First, check what your operating system
username is:

```sh
whoami
```

If your username is "ian", for example, you'd need to create a Postgres user
with that same name. To do so, run this command to open the Postgres CLI:

```sh
sudo -u postgres -i
```

From the Postgres CLI, run this command (replacing "ian" with your username):

```sh
createuser -sr ian
```

Then enter `control + d` or type `logout` to exit.

[This guide][postgresql wsl] has more info on setting up Postgres on WSL if you
get stuck.

[postgresql wsl]: https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql

#### Postgresql Installation for OSX

To install Postgres for OSX, you can use Homebrew:

```sh
brew install postgresql
```

Once Postgres has been installed, run this command to start the Postgres
service:

```sh
brew services start postgresql
```

# Your Dog's Social Adventure Begins!
Friendo is your gateway to fostering social connections for your furry companions. 
Watch as your dogs forge new friendships and explore the world together, all thanks to Friendo's innovative platform.
