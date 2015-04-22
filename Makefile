.PHONY: distro

name=bricks
user=root
node=digitalocean-prod-0

init:
	bower install
	npm install

clean:
	grunt clean

build:
	grunt build

stage:
	-rm -rf app/bower_components
	ln -s $(PWD)/bower_components app/bower_components

distro-clean:
	rm -rf distro

distro: distro-clean
	# Make sure the package is built
	ls dist
	# Ensure the distro dir exist
	-mkdir distro
	# Change the name of the folder to root to match required package structure
	-mv dist root
	# zip the dist dir and and place the zip in the distro folder
	-zip -r ./distro/$(name).zip ./root > /dev/null
	# Change the name back to dist
	-mv root dist

deploy: distro
	# Ensure the distro exist
	ls distro/$(name).zip
	# Copy the distro to production
	scp distro/$(name).zip $(user)@$(node):/var/lib/skyraid/packages/$(name).zip

devdeploy: build distro
	-rm /var/lib/skyraid/packages/$(name).zip
	-mkdir /var/lib/skyraid/packages
	cp distro/$(name).zip /var/lib/skyraid/packages/$(name).zip
