(function () {
  'use strict';

  const yearEl = document.querySelector('[data-current-year]');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const navToggle = document.querySelector('[data-nav-toggle]');
  const primaryNav = document.getElementById('primary-navigation');
  if (navToggle instanceof HTMLElement && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    primaryNav.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const searchForm = document.querySelector('.site-search');
  if (searchForm instanceof HTMLFormElement) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchInput = searchForm.querySelector('input[name="q"]');
      if (!(searchInput instanceof HTMLInputElement)) return;
      const query = searchInput.value.trim();
      if (query.length < 2) {
        searchInput.focus();
        return;
      }
      const destination = `https://www.geminiparts.co.za/search?q=${encodeURIComponent(query)}`;
      window.location.href = destination;
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = (anchor.getAttribute('href') || '').substring(1);
      if (!targetId || targetId === anchor.getAttribute('href')) return;
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const forms = document.querySelectorAll('form[data-enhanced]');
  forms.forEach((form) => enhanceForm(form));

  function enhanceForm(form) {
    if (!(form instanceof HTMLFormElement)) return;
    form.setAttribute('novalidate', 'true');

    const statusEl = form.querySelector('[data-form-status]');
    const resultEl = form.parentElement?.querySelector('[data-form-result]');
    const mailtoBtn = form.querySelector('[data-mailto]');

    form.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const fieldWrapper = target.closest('[data-field]');
      if (fieldWrapper) {
        clearFieldError(fieldWrapper);
      }
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const invalidFields = validateForm(form);
      if (invalidFields.length) {
        invalidFields[0].focus();
        return;
      }

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      setStatus(statusEl, 'is-loading', 'Submitting your details…');
      if (mailtoBtn instanceof HTMLAnchorElement) {
        mailtoBtn.hidden = true;
      }
      if (resultEl instanceof HTMLElement) {
        resultEl.hidden = true;
        resultEl.innerHTML = '';
      }

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = true;
        submitButton.setAttribute('aria-busy', 'true');
      }

      try {
        const response = await submitWithAjax(form, payload);
        handleSuccess(form, statusEl, resultEl, mailtoBtn, response, payload);
        form.reset();
      } catch (error) {
        console.error(error);
        setStatus(statusEl, 'is-error', 'We could not submit your request right now. Please try again or call us.');
      } finally {
        if (submitButton instanceof HTMLButtonElement) {
          submitButton.disabled = false;
          submitButton.removeAttribute('aria-busy');
        }
      }
    });
  }

  function validateForm(form) {
    const invalid = [];
    form.querySelectorAll('[data-field]').forEach((wrapper) => {
      if (!(wrapper instanceof HTMLElement)) return;
      const control = wrapper.querySelector('input, select, textarea');
      const errorEl = wrapper.querySelector('[data-error]');
      if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement)) {
        return;
      }
      if (!control.checkValidity()) {
        wrapper.classList.add('has-error');
        if (errorEl) {
          const customMessage = control.validationMessage || 'Please provide a valid value.';
          errorEl.textContent = customMessage;
        }
        invalid.push(control);
      } else {
        clearFieldError(wrapper);
      }
    });
    return invalid;
  }

  function clearFieldError(wrapper) {
    wrapper.classList.remove('has-error');
    const errorEl = wrapper.querySelector('[data-error]');
    if (errorEl) errorEl.textContent = '';
  }

  function setStatus(statusEl, modifier, message) {
    if (!(statusEl instanceof HTMLElement)) return;
    statusEl.classList.remove('is-loading', 'is-success', 'is-error');
    if (modifier) statusEl.classList.add(modifier);
    statusEl.textContent = message;
  }

  async function submitWithAjax(form, payload) {
    const shouldMock = form.dataset.mock === 'true' || !window.fetch;
    if (shouldMock) {
      await delay(600);
      if (form.dataset.formType === 'enquiry') {
        return buildEnquirySummary(payload);
      }
      if (form.dataset.formType === 'contact') {
        return buildContactSummary(form, payload);
      }
      return { ok: true };
    }

    const method = (form.method || 'post').toUpperCase();
    const headers = { Accept: 'application/json' };
    let fetchOptions = { method, headers };

    if (method === 'GET') {
      const actionUrl = form.action || window.location.href;
      const url = new URL(actionUrl, window.location.origin);
      Object.entries(payload).forEach(([key, value]) => {
        if (typeof value === 'string') {
          url.searchParams.set(key, value);
        }
      });
      return fetch(url.toString(), fetchOptions).then(handleJsonResponse);
    }

    fetchOptions = {
      method,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };
    return fetch(form.action || window.location.href, fetchOptions).then(handleJsonResponse);
  }

  function handleJsonResponse(response) {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return response.json();
    }
    return response.text();
  }

  function handleSuccess(form, statusEl, resultEl, mailtoBtn, response, payload) {
    setStatus(statusEl, 'is-success', 'Thank you! We have received your submission.');
    if (form.dataset.formType === 'enquiry' && resultEl instanceof HTMLElement) {
      const summary = typeof response === 'object' && response !== null ? response : buildEnquirySummary(payload);
      renderEnquirySummary(resultEl, summary);
      resultEl.hidden = false;
    }
    if (form.dataset.formType === 'contact' && mailtoBtn instanceof HTMLAnchorElement) {
      const detail = typeof response === 'object' && response !== null ? response : buildContactSummary(form, payload);
      if (detail.mailto) {
        mailtoBtn.href = detail.mailto;
        mailtoBtn.hidden = false;
      }
      if (detail.preview && statusEl instanceof HTMLElement) {
        statusEl.textContent = detail.preview;
      }
    }
  }

  function renderEnquirySummary(container, summary) {
    if (!summary || typeof summary !== 'object') return;
    const { title, estimatedCost, availability, nextSteps } = summary;
    const items = [
      title ? `<h3>${title}</h3>` : '',
      availability ? `<p><strong>Availability:</strong> ${availability}</p>` : '',
      estimatedCost ? `<p><strong>Estimated cost:</strong> ${estimatedCost}</p>` : '',
      nextSteps ? `<p>${nextSteps}</p>` : '',
    ].filter(Boolean);
    container.innerHTML = items.join('');
  }

  function buildEnquirySummary(payload) {
    const interestMap = {
      brakes: {
        title: 'Brake systems & hydraulics',
        basePrice: 1450,
        availability: 'In stock at our Johannesburg distribution centre',
      },
      filters: {
        title: 'Filters & service kits',
        basePrice: 980,
        availability: 'Available for overnight delivery nationwide',
      },
      suspension: {
        title: 'Suspension & steering',
        basePrice: 2120,
        availability: 'Limited stock — reserve soon for guaranteed delivery',
      },
      cooling: {
        title: 'Cooling & climate control',
        basePrice: 1750,
        availability: 'Ships within 24 hours from Gauteng warehouse',
      },
      electrical: {
        title: 'Engine electrics & sensors',
        basePrice: 1580,
        availability: 'Live-tested and ready for dispatch',
      },
      accessories: {
        title: 'Accessories & detailing',
        basePrice: 650,
        availability: 'In stock — customise your order in the quote stage',
      },
      fleet: {
        title: 'Fleet maintenance contract',
        basePrice: 0,
        availability: 'Dedicated account manager will confirm contract terms',
      },
    };

    const interest = typeof payload.interest === 'string' ? payload.interest : '';
    const quantity = Number(payload.quantity || 1);
    const record = interestMap[interest] || {
      title: 'Custom parts request',
      basePrice: 1200,
      availability: 'We will confirm availability with our supplier network.',
    };

    const price = Math.max(1, quantity) * record.basePrice;
    const formattedPrice = record.basePrice > 0 ? formatCurrency(price) : 'We will prepare a tailored proposal.';
    const preferredDate = typeof payload.preferredDate === 'string' && payload.preferredDate
      ? new Date(payload.preferredDate).toLocaleDateString()
      : null;
    const nextSteps = preferredDate
      ? `We will confirm fitment or delivery options for ${preferredDate} and share a detailed quote via ${payload.contactMethod || 'your chosen channel'}.`
      : 'We will confirm the soonest delivery or fitment slot and send you a detailed quote.';

    return {
      title: `Estimated summary for ${record.title}`,
      availability: record.availability,
      estimatedCost: formattedPrice,
      nextSteps,
    };
  }

  function buildContactSummary(form, payload) {
    const recipient = form.dataset.recipient || 'support@geminiparts.co.za';
    const name = typeof payload.name === 'string' && payload.name ? payload.name : 'Gemini Parts customer';
    const topic = typeof payload.messageType === 'string' && payload.messageType ? payload.messageType : 'general enquiry';
    const subject = encodeURIComponent(`[${topic.toUpperCase()}] Message from ${name}`);
    const message = typeof payload.message === 'string' ? payload.message : '';
    const phoneLine = typeof payload.phone === 'string' && payload.phone ? `Phone: ${payload.phone}\n` : '';
    const referenceLine = typeof payload.reference === 'string' && payload.reference ? `Reference: ${payload.reference}\n` : '';
    const email = typeof payload.email === 'string' ? payload.email : '';

    const body = encodeURIComponent(
      `Hello Gemini Parts,%0D%0A%0D%0A${message}%0D%0A%0D%0A${phoneLine}${referenceLine}Sent from: ${name} (${email})`
    );

    return {
      mailto: `mailto:${recipient}?subject=${subject}&body=${body}`,
      preview: 'Click “Open email draft” to finalise your message in your email client.',
    };
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
  }

  function delay(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }
})();
