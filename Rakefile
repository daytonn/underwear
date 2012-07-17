#require 'fileutils'
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

task :travis do
  ["rake jasmine:ci"].each do |cmd|
    puts "Starting to run #{cmd}..."
    system("export DISPLAY=:99.0 && bundle exec #{cmd}")
    raise "#{cmd} failed!" unless $?.exitstatus == 0
  end
end

task :default => 'travis'


task :docs do
  puts `docco src/*.js`
end

task :publish do
  begin_time = Time.now
  tmpdir = Dir.mktmpdir
  target_dir = File.expand_path '~/Development/underwear'

  `docco src/*.js`
  FileUtils.cp_r "docs", tmpdir
  `architect compile`
  FileUtils.cp_r "lib/underwear.js", tmpdir
  `architect compile -c`
  FileUtils.cp_r "lib/underwear.js", "#{tmpdir}/underwear.min.js"
  `git commit -am "Publish commit #{Time.now}"`
  `git checkout gh-pages`
  FileUtils.cp_r tmpdir, target_dir
  FileUtils.rm_rf tmpdir
  `git commit -am "Publish commit #{Time.now}"`
  `git checkout master`
  puts "Underwear.js built in #{Time.now - begin_time}"
end