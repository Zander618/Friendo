# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_01_22_230249) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "dog_meetups", force: :cascade do |t|
    t.integer "meetup_id"
    t.integer "invitee_id"
    t.integer "invitor_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dogs", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.string "breed"
    t.string "traits"
    t.string "enjoyed_activities"
    t.integer "age"
    t.text "image_data"
    t.boolean "vaccination"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "locations", force: :cascade do |t|
    t.string "address"
    t.string "name"
    t.string "photo"
    t.boolean "is_a_dog_park"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "meetups", force: :cascade do |t|
    t.integer "location_id"
    t.datetime "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "first_name"
    t.string "state"
    t.string "country"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
