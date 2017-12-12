var assert = require('assert');
var resemble = require('resemblejs');
var fs = require('fs');
var path = require('path');
var process = require('process');
var server = require('../server.js');
server.startServer(8090);
var url = 'http://localhost:8090';

describe('Tryout#1 - ', function() {

	it('Teste de fumaça: pelo menos este teste tem que rodar', function() {
		assert(true, true)
	});

	describe('Código HTML&CSS: ', function() {

		it('O layout desktop deve ser igual ao gabarito', function () {
			layoutTestRunner("assertion-desktop.png", 800, 600)
	    });

	    it('O layout mobile deve ser igual ao gabarito', function () {
	        layoutTestRunner("assertion-mobile.png", 376, 627)
	    });

	});

	describe('Formulário de inscrição: ', function() {
		it ('Deve inscrever no processo sem erros', function() {
			browser.url(url);
			browser.click('#btn-apply-form');
			browser.waitForVisible('#apply-modal');
			browser.element('#name').setValue("ACME");
			browser.element('#email').setValue("acme@gama.academy");
			browser.click('#btn-apply');
			browser.waitForVisible('#apply-success');
		})

		it ('Não deve se inscrever no processo com nome ou email em branco', function() {
			browser.url(url);
			browser.click('#btn-apply-form');
			browser.waitForVisible('#apply-modal');
			browser.click('#btn-apply');
			browser.waitForVisible('#apply-error');
			assert.equal("Não pode estar vazio", browser.element('#feedback-name').getText());
			assert.equal("Não pode estar vazio\nNão é válido", browser.element('#feedback-email').getText());
		})
	})
});


function layoutTestRunner(assertion_file, width, height) {
	browser.setViewportSize({
	    width: width,
	    height: height
	});
	browser.url(url);
	browser.waitForVisible('#main');
	var screenshotName = './screenshot-' + assertion_file
	browser.saveScreenshot(screenshotName);
	var os = process.platform;
	var diff = resemble(fs.readFileSync(screenshotName))
		.compareTo(fs.readFileSync('./test/' + os + "-" + assertion_file))
		.ignoreAntialiasing()
		.onComplete(function(data) {
		if (data.rawMisMatchPercentage > 0) {
	        fs.writeFileSync('./diff-' + path.basename(assertion_file) + '.png', data.getBuffer());
		}
	    assert.equal(data.rawMisMatchPercentage, 0);
	});	
}