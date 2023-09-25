default: hup
hup:
	kill -HUP `cat ./tmp/pids/thin.pid`

start:
	bundle exec thin start -R config.ru -p 9292 -C thin.yml

stop:
	kill -QUIT `cat ./tmp/pids/thin.pid`

prepare:
	-mkdir tmp
	-mkdir tmp/pids
	-mkdir tmp/public
	-mkdir views
	-mkdir log
install:
	bundle install
