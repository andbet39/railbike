require 'test_helper'
require 'generators/build/build_generator'

class BuildGeneratorTest < Rails::Generators::TestCase
  tests BuildGenerator
  destination Rails.root.join('tmp/generators')
  setup :prepare_destination

  # test "generator runs without errors" do
  #   assert_nothing_raised do
  #     run_generator ["arguments"]
  #   end
  # end
end
