const user = (state = {}, action) => {
  switch(action.type) {
    case 'USER':
      let { id, role, first_name, last_name, phone_number, email, company_id, region_id, office_id, assigned_company, avatar, wage } = action;
      return { id, role, first_name, last_name, phone_number, email, company_id, region_id, office_id, assigned_company, avatar, wage };
    default:
      return state;
  }
}

export default user;
