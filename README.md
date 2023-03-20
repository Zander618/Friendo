# Friendo

# Co-opper 

## Description

After two years of working from home not only have we spent too much time apart but so have our dogs.
Anti-social dogs can not only present problems inside the house but they are also more likely to be aggressive outside the house
so we aim to find your dog/dogs their new dog best friend.


## Setup

FIRST 
run "bundle install" to install all dependencies

SECOND
have postgres running before starting rails server
in the terminal run "sudo service postgresql start"
if postgres is not installed directions are provided below

THIRD
run "rails db:migrate"
and then 
start the rails server
"rails s"

FOURTH
Use "npm install --prefix client" to get the packages for the frontend.

FIFTH
start the frontend client
"npm start --prefix client"

# Usage

## Home
Offers a brief description of what the application does and is about.

## Dogs
Shows all the dogs currently in the database minus your own dogs. Allows you to see all the information provided about them and allows you to invite them along with one of 
your dogs to meet up.

## Create Meetup
This form will allow you to select a location, your dog, a date, and a time for the requested meetup.

## Locations
Is a list of all the added locations so far. Any use can add and edit in locations. This will create and grow the list of places where all dogs can meet up.

## AddDog
This is the subsection that allows a user to add their dog or dogs.

## Profile
Finally the profile component allows a user to update their information, their dog's information, and add or change a photo of their dog.

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


