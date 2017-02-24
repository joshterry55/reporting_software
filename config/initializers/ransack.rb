ransack.configure do |config|
  config.add_predicate 'string_like_any',
     arel_predicate: 'matches',
     formatter: proc { |v| "%#{v.split(' ').join('%%')}%"},
     validator: proc { |v| v.present? }
end
