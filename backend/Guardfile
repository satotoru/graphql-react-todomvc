guard :shell do
  watch(%r{app/graphql/.+\.rb$}) do
    puts "detect file changes"
    `bin/rails graphql:schema:json`
  end
end
