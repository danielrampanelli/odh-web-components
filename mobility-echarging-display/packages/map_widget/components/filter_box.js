import { html } from 'lit-element';
import icon__green_marker from '../icons/green/green@2x.png';
import style from '../scss/details_box.scss';
import { t } from '../translations';
import { getStyle, utils_capitalize } from '../utils';

export function render__filter_box() {
  const repaint_map = () => {
    this.map.removeLayer(this.layer_columns);
    this.map.removeLayer(this.layer_user);
    this.drawMap();
    this.is_loading = false;
  };

  const handle__radius = e => {
    this.filters = {
      ...this.filters,
      radius: parseInt(e.target.value)
    };
  };

  const handle__access_type = e => {
    if (e.target.checked) {
      this.filters = {
        ...this.filters,
        access_type: [...this.filters.access_type, e.target.value]
      };
    } else {
      this.filters = {
        ...this.filters,
        access_type: this.filters.access_type.filter(o => o !== e.target.value)
      };
    }
  };

  const handle__plug_type = e => {
    if (e.target.checked) {
      this.filters = {
        ...this.filters,
        plug_type: [...this.filters.plug_type, e.target.value]
      };
    } else {
      this.filters = {
        ...this.filters,
        plug_type: this.filters.plug_type.filter(o => o !== e.target.value)
      };
    }
  };

  const handle__provider = e => {
    if (e.target.checked) {
      this.filters = {
        ...this.filters,
        provider: [...this.filters.provider, e.target.value]
      };
    } else {
      this.filters = {
        ...this.filters,
        provider: this.filters.provider.filter(o => o !== e.target.value)
      };
    }
  };

  const handle__state = e => {
    if (e.target.checked) {
      this.filters = {
        ...this.filters,
        state: [...this.filters.state, e.target.id]
      };
    } else {
      this.filters = {
        ...this.filters,
        state: this.filters.state.filter(o => o !== e.target.id)
      };
    }
  };

  const handle__reset_filters = () => {
    this.filters = {
      ...this.filters,
      radius: 0,
      access_type: [],
      plug_type: [],
      provider: []
    };
    let all_checkbox = this.shadowRoot.querySelectorAll('.filter_box input[type="checkbox"]');
    for (let i = 0; i < all_checkbox.length; i++) {
      const element = all_checkbox[i];
      element.checked = false;
    }
    this.shadowRoot.getElementById('input_filter_radius').value = '0';
    repaint_map();
  };

  return html`
    <style>
      ${getStyle(style)}
    </style>
    <div class="details_box filter_box">
      <div class="details_box__body">
        <!-- Detail box -->
        <div class="details_box__section mt-3">
          <div class="col-12 d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <p class="fs-16">${t.search_filters[this.language]}</p>
            </div>
            <div class="col-auto col-sm-12 p-0 d-flex align-items-center mt-lg-2">
              <div>
                <img class="w-24px mr-1 d-none d-lg-block" src="${icon__green_marker}" alt="" />
              </div>
              <p class="fs-14 color-black-400">
                ${this.visibleStations} ${t.available_columns[this.language].toLowerCase()}
              </p>
            </div>
          </div>
          <div class="col-12 p-0 mt-2 d-none d-lg-block">
            <div style="border-bottom: 2px solid #f0f1f1;"></div>
          </div>
          <div class="col-12 mt-3 mb-3">
            <p class="fs-14 color-black-400">${t.research_range[this.language]}</p>
            <select @change="${e => handle__radius(e)}" name="" id="input_filter_radius" class="mt-2" style="">
              <option value="0">${t.no_one[this.language]}</option>
              <option value="5">5km</option>
              <option value="10">10km</option>
              <option value="15">15km</option>
            </select>
          </div>
        </div>
        <!-- Detail box -->
        <div class="details_box__section mt-3">
          <div class="col-12">
            <p class="fs-14">${t.type_of_access[this.language]}</p>
            <div class="custom-checkbox mt-3">
              <label htmlFor="access-1" class="fs-16">
                <input value="PUBLIC" type="checkbox" id="access-1" @change="${e => handle__access_type(e)}" />
                <span class="custom-checkbox-checkbox mr-2"></span>
                ${utils_capitalize(t.public[this.language])}
              </label>
            </div>
            <hr />
            <div class="custom-checkbox mt-2">
              <label htmlFor="access-2" class="fs-16">
                <input value="PRIVATE" type="checkbox" id="access-2" @change="${e => handle__access_type(e)}" />
                <span class="custom-checkbox-checkbox mr-2"></span>
                ${utils_capitalize(t.private[this.language])}
              </label>
            </div>
          </div>
        </div>
        <!-- Detail box -->
        <div class="details_box__section mt-3 d-none">
          <div class="col-12">
            <p class="fs-14">${t.column_state[this.language]}</p>
            <div class="custom-checkbox mt-3">
              <label htmlFor="state-1" class="fs-16">
                <input type="checkbox" id="state-1" @change="${e => handle__state(e)}" />
                <span class="custom-checkbox-checkbox mr-2"></span>
                ${t.completely_free[this.language]}
              </label>
            </div>
            <hr />
            <div class="custom-checkbox mt-2">
              <label htmlFor="state-2" class="fs-16">
                <input type="checkbox" id="state-2" @change="${e => handle__state(e)}" />
                <span class="custom-checkbox-checkbox mr-2"></span>
                ${t.at_least_one_free_column[this.language]}
              </label>
            </div>
          </div>
        </div>
        <!-- Detail box -->
        <div class="details_box__section mt-3">
          <div class="col-12">
            <p class="fs-14">${t.plug_type[this.language]}</p>
            <!-- "700 bar small vehicles" "UNKNOWN" -->
            <div class="custom-checkbox mt-3">
              <label htmlFor="plug-1" class="fs-16">
                <input type="checkbox" id="plug-1" value="Type2Mennekes" @change="${e => handle__plug_type(e)}" />
                <span class="custom-checkbox-checkbox mr-2"></span>
                Type 2 Mennekes
              </label>
            </div>
            <hr />
            <div class="custom-checkbox mt-2">
              <label htmlFor="plug-2" class="fs-16">
                <input type="checkbox" id="plug-2" value="Type 3A" @change="${e => handle__plug_type(e)}" />
                <span class="custom-checkbox-checkbox mr-2"></span>
                Type 3A
              </label>
            </div>

            <hr />
            <div class="custom-checkbox mt-2">
              <label htmlFor="plug-3" class="fs-16">
                <input type="checkbox" id="plug-3" value="CHAdeMO" @change="${e => handle__plug_type(e)}" />
                <span class="custom-checkbox-checkbox mr-2"></span>
                CHAdeMO
              </label>
            </div>
            <hr />
            <!-- <div class="custom-checkbox mt-2">
              <label htmlFor="plug-4" class="fs-16">
                <input type="checkbox" id="plug-4" />
                <span class="custom-checkbox-checkbox mr-2"></span>
                Tesla Supercharger NON IN API
              </label>
            </div> -->
            <div class="custom-checkbox mt-2">
              <label htmlFor="plug-4" class="fs-16">
                <input type="checkbox" id="plug-4" value="CCS" @change="${e => handle__plug_type(e)}" />
                <span class="custom-checkbox-checkbox mr-2"></span>
                Type 1 CCS
              </label>
            </div>
            <hr />
            <div class="custom-checkbox mt-2">
              <label htmlFor="plug-5" class="fs-16">
                <input type="checkbox" id="plug-5" value="Schuko" @change="${e => handle__plug_type(e)}" />
                <span class="custom-checkbox-checkbox mr-2"></span>
                Schuko
              </label>
            </div>
            <hr />
            <div class="custom-checkbox mt-2">
              <label htmlFor="plug-6" class="fs-16">
                <input type="checkbox" id="plug-6" value="Type2 - 230Vac" @change="${e => handle__plug_type(e)}" />
                <span class="custom-checkbox-checkbox mr-2"></span>
                Type2 - 230Vac
              </label>
            </div>
          </div>
        </div>
        <!-- Detail box -->
        <div class="details_box__section mt-3 mb-5">
          <div class="col-12">
            <p class="fs-14 mb-3">${t.provider[this.language]}</p>
            ${this.provider_list.map((o, i) => {
              return html`
                <div class="custom-checkbox mt-2">
                  <label htmlFor=${`provider-${i + 1}`} class="fs-16">
                    <input type="checkbox" id=${`provider-${i + 1}`} value=${o} @change="${e => handle__provider(e)}" />
                    <span class="custom-checkbox-checkbox mr-2"></span>
                    ${o}
                  </label>
                </div>
                <hr />
              `;
            })}
          </div>
        </div>
        <!-- provider_list -->
        <!-- End -->
        <!-- Detail box -->
        <!-- <div class="details_box__section mt-3 d-none">
          <div class="col-12">
            <p class="fs-14 mb-3">METODO DI PAGAMENTO</p>
          </div>
        </div> -->
        <!-- End -->
      </div>
      <div class="filter_box__footer d-flex pr-3 pl-3">
        <button
          class="flex-fill filter_box_footer__button secondary mr-2"
          @click="${() => {
            this.showFilters = false;
            handle__reset_filters();
          }}"
        >
          ${t.cancel_filters[this.language]}
        </button>
        <button class="flex-fill filter_box_footer__button primary ml-2" @click="${() => repaint_map()}">
          ${t.apply_filters[this.language]}
        </button>
      </div>
    </div>
  `;
}
