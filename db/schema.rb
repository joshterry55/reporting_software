# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170324193009) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "announcements", force: :cascade do |t|
    t.string   "title",      null: false
    t.string   "body"
    t.string   "date"
    t.integer  "office_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["office_id"], name: "index_announcements_on_office_id", using: :btree
  end

  create_table "companies", force: :cascade do |t|
    t.string   "name",                                                                                                          null: false
    t.datetime "created_at",                                                                                                    null: false
    t.datetime "updated_at",                                                                                                    null: false
    t.string   "avatar",              default: "http://res.cloudinary.com/dk2bj79p0/image/upload/v1488493338/anon3_ozafcv.jpg"
    t.string   "cancel_percentage",   default: "35"
    t.string   "true_percentage",     default: "30"
    t.string   "color",               default: "#354458"
    t.string   "lifetime_kw",         default: "1000"
    t.string   "accent_color",        default: "#60b9e8"
    t.string   "color_text",          default: "#ffffff"
    t.string   "accent_text",         default: "#ffffff"
    t.string   "secondary_nav_color", default: "#808080"
    t.string   "secondary_text",      default: "#ffffff"
  end

  create_table "competition_groups", force: :cascade do |t|
    t.integer  "competition_id"
    t.string   "avatar"
    t.string   "name"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "group_id"
    t.index ["competition_id"], name: "index_competition_groups_on_competition_id", using: :btree
  end

  create_table "competitions", force: :cascade do |t|
    t.integer  "company_id"
    t.string   "name"
    t.datetime "start_date"
    t.datetime "end_date"
    t.string   "competition_type"
    t.string   "grouped_by"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["company_id"], name: "index_competitions_on_company_id", using: :btree
  end

  create_table "offices", force: :cascade do |t|
    t.string   "name",                                                                                                 null: false
    t.integer  "region_id"
    t.datetime "created_at",                                                                                           null: false
    t.datetime "updated_at",                                                                                           null: false
    t.integer  "company_id"
    t.string   "avatar",     default: "http://res.cloudinary.com/dk2bj79p0/image/upload/v1488493338/anon3_ozafcv.jpg"
    t.index ["company_id"], name: "index_offices_on_company_id", using: :btree
    t.index ["region_id"], name: "index_offices_on_region_id", using: :btree
  end

  create_table "prizes", force: :cascade do |t|
    t.integer  "competition_id"
    t.string   "name"
    t.string   "avatar"
    t.string   "rank"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["competition_id"], name: "index_prizes_on_competition_id", using: :btree
  end

  create_table "regions", force: :cascade do |t|
    t.string   "name",                                                                                                 null: false
    t.integer  "company_id"
    t.datetime "created_at",                                                                                           null: false
    t.datetime "updated_at",                                                                                           null: false
    t.string   "avatar",     default: "http://res.cloudinary.com/dk2bj79p0/image/upload/v1488493338/anon3_ozafcv.jpg"
    t.index ["company_id"], name: "index_regions_on_company_id", using: :btree
  end

  create_table "sales", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "kw"
    t.integer  "sit_down"
    t.integer  "site_survey"
    t.integer  "close"
    t.integer  "cancel"
    t.date     "date"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "region_id"
    t.integer  "office_id"
    t.string   "salesman"
    t.integer  "company_id"
    t.index ["company_id"], name: "index_sales_on_company_id", using: :btree
    t.index ["office_id"], name: "index_sales_on_office_id", using: :btree
    t.index ["region_id"], name: "index_sales_on_region_id", using: :btree
    t.index ["user_id"], name: "index_sales_on_user_id", using: :btree
  end

  create_table "training_categories", force: :cascade do |t|
    t.string   "name"
    t.integer  "company_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_training_categories_on_company_id", using: :btree
  end

  create_table "training_sections", force: :cascade do |t|
    t.string   "name"
    t.string   "avatar",               default: "http://res.cloudinary.com/dk2bj79p0/image/upload/v1483585049/anonBee_wgbcih.jpg"
    t.integer  "training_category_id"
    t.datetime "created_at",                                                                                                       null: false
    t.datetime "updated_at",                                                                                                       null: false
    t.integer  "company_id"
    t.index ["company_id"], name: "index_training_sections_on_company_id", using: :btree
    t.index ["training_category_id"], name: "index_training_sections_on_training_category_id", using: :btree
  end

  create_table "training_videos", force: :cascade do |t|
    t.string   "name",                null: false
    t.text     "link",                null: false
    t.integer  "training_section_id"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.integer  "company_id"
    t.string   "video_purpose"
    t.index ["company_id"], name: "index_training_videos_on_company_id", using: :btree
    t.index ["training_section_id"], name: "index_training_videos_on_training_section_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name",                                                                                                       null: false
    t.string   "last_name",                                                                                                        null: false
    t.string   "phone_number"
    t.string   "role",                   default: "Employee",                                                                      null: false
    t.integer  "company_id"
    t.integer  "region_id"
    t.integer  "office_id"
    t.datetime "created_at",                                                                                                       null: false
    t.datetime "updated_at",                                                                                                       null: false
    t.string   "email",                  default: "",                                                                              null: false
    t.string   "encrypted_password",     default: "",                                                                              null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,                                                                               null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.string   "invited_by_type"
    t.integer  "invited_by_id"
    t.integer  "invitations_count",      default: 0
    t.jsonb    "assigned_company",       default: [],                                                                                           array: true
    t.jsonb    "assigned_regions",       default: [],                                                                                           array: true
    t.jsonb    "assigned_offices",       default: [],                                                                                           array: true
    t.string   "avatar",                 default: "http://res.cloudinary.com/dk2bj79p0/image/upload/v1488493338/anon3_ozafcv.jpg"
    t.string   "wage",                   default: "200"
    t.index ["company_id"], name: "index_users_on_company_id", using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true, using: :btree
    t.index ["invitations_count"], name: "index_users_on_invitations_count", using: :btree
    t.index ["invited_by_id"], name: "index_users_on_invited_by_id", using: :btree
    t.index ["office_id"], name: "index_users_on_office_id", using: :btree
    t.index ["region_id"], name: "index_users_on_region_id", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "announcements", "offices"
  add_foreign_key "competition_groups", "competitions"
  add_foreign_key "competitions", "companies"
  add_foreign_key "offices", "companies"
  add_foreign_key "offices", "regions"
  add_foreign_key "prizes", "competitions"
  add_foreign_key "regions", "companies"
  add_foreign_key "sales", "companies"
  add_foreign_key "sales", "offices"
  add_foreign_key "sales", "regions"
  add_foreign_key "sales", "users"
  add_foreign_key "training_sections", "companies"
  add_foreign_key "training_sections", "training_categories"
  add_foreign_key "training_videos", "companies"
  add_foreign_key "training_videos", "training_sections"
  add_foreign_key "users", "companies"
  add_foreign_key "users", "offices"
  add_foreign_key "users", "regions"
end
