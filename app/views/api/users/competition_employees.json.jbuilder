json.array! @employees do |emp|
  json.first_name emp.first_name
  json.last_name emp.last_name
  json.id emp.id
  json.office_id emp.office_id
  json.region_id emp.region_id
  json.avatar emp.avatar
end
