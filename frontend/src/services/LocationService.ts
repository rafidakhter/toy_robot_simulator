import { Location } from '@/models'
import { DataClient } from './DataClient'
import { LocationDto, Orientation } from '@toy-robot-simulator/shared'

export class LocationService {
  private readonly baseUrl =
    process.env.BACK_END_SERVER_BSE_URL || 'http://localhost:4800'
  private readonly dataClient = new DataClient()
  private readonly urlKey = 'locations'

  private transformDtoToData(dto?: LocationDto): Location | undefined {
    return (
      dto && {
        row: dto.row,
        column: dto.column,
        orientation: dto.orientation,
      }
    )
  }

  public async getLastLocation(): Promise<Location | undefined> {
    try {
      const url = `${this.baseUrl}/${this.urlKey}`
      const dto = await this.dataClient.get<LocationDto | undefined>(url)
      return this.transformDtoToData(dto)
    } catch {
      throw new Error(
        '[LocationService][getLastCoordinates]: Failed to fetch last location',
      )
    }
  }

  public async updateLocation(
    newLocation: Location,
  ): Promise<Location | undefined> {
    try {
      const url = `${this.baseUrl}/${this.urlKey}`
      const dto = await this.dataClient.post<LocationDto>(url, {
        ...newLocation,
        orientation: newLocation.orientation as Orientation,
      } as LocationDto)
      return this.transformDtoToData(dto)
    } catch {
      throw new Error(
        '[LocationService][updateCoordinate]: Failed to update last location',
      )
    }
  }
}
