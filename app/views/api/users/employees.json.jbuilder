json.array! @employees do |emp|
  json.first_name emp.first_name
  json.last_name emp.last_name
  json.id emp.id
  json.office_id emp.office_id
  json.region_id emp.region_id
  json.avatar emp.avatar
  json.phone_number emp.phone_number
  json.role emp.role
  json.company_id emp.company_id
  json.email emp.email
  json.assigned_company emp.assigned_company
  json.assigned_regions emp.assigned_regions
  json.assigned_offices emp.assigned_offices
end
