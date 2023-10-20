import { Controller } from "@hotwired/stimulus"
export default class SearchController extends Controller {
  show () {
    document.querySelector("bridgetown-ninja-keys").open()
  }
}
