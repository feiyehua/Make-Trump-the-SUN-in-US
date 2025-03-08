// ==UserScript==
// @name         Make Trump the SUN in the US
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bold every Trump on Whitehouse website
// @author       FeiYehua
// @match        https://www.whitehouse.gov/*
// @grant        MIT
// ==/UserScript==


(function() {
    'use strict';

    // Specify the bolded textes here
    const keyword = ['President Donald J. Trump','President Trump','Donald J. Trump','Donald Trump','Melania Trump','Barron Trump','Mr Trump','Trump'];
    const style = 'font-weight: bold; font-size: 1.1em;';

    // traverse the whole website
    function walkNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = node.textContent.replace(
                new RegExp(`\\b${keyword.join('|')}\\b`, 'gi'),
                //match the target words
                match => `<span style="${style}">${match}</span>`
            );
            while (tempDiv.firstChild) {
                node.parentNode.insertBefore(tempDiv.firstChild, node);
            }
            node.parentNode.removeChild(node);
        } else {
            for (let child of node.childNodes) {
                walkNodes(child);
            }
        }
    }

    window.addEventListener('DOMContentLoaded', function() {
        walkNodes(document.body);
    });

})();